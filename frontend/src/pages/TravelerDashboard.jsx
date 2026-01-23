
import { useEffect, useState } from "react";
import { fetchNearbyOrders } from '../api/fetchNearbyOrders';
import TravelerStatusToggle from "../components/traveler/TravelerStatusToggle.jsx";
import io from "socket.io-client";
import OrderList from '../components/traveler/OrderList';
import { updateTravellerLocation } from '../api/travellers';
import { acceptOrder } from '../api/acceptOrder';

// Request location on mount to trigger location popup after login
// (must be after useState is defined)


const TravelerDashboard = () => {
  const [online, setOnline] = useState(false);
  const [orderNotification, setOrderNotification] = useState(null);
  const [orders, setOrders] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [travellerId, setTravellerId] = useState(() => localStorage.getItem('travellerId') || 'demo-traveller');
  const socket = io("http://localhost:3000", { withCredentials: true, query: { travellerId } });

  useEffect(() => {
    console.log("useEffect [online] triggered", { online, location });
    if (online) {
      // Prompt for location if not set
      if (!location.lat || !location.lng) {
        if (navigator.geolocation) {
          console.log("Requesting geolocation...");
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;
              console.log('Got location:', latitude, longitude);
              setLocation({ lat: latitude, lng: longitude });
              await updateTravellerLocation(travellerId, latitude, longitude);
              console.log('Location sent to backend');
              socket.emit("traveller:online");
            },
            (err) => {
              console.error("Geolocation error:", err);
              alert("Location permission required to go online.");
              setOnline(false);
            }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
          setOnline(false);
        }
      } else {
        console.log('Using existing location:', location);
        updateTravellerLocation(travellerId, location.lat, location.lng);
        socket.emit("traveller:online");
      }
    } else {
      socket.emit("traveller:offline");
    }
    // eslint-disable-next-line
  }, [online]);

  // Fetch nearby orders from backend when online and location is set
  useEffect(() => {
    if (online && location.lat && location.lng) {
      fetchNearbyOrders(location.lat, location.lng)
        .then(({ orders }) => {
          const mapped = orders.map(order => ({
            id: order.id,
            itemName: order.data?.item?.name || "Parcel",
            itemDescription: order.data?.item?.description || "",
            pickupLocation: order.data?.pickup?.address || `${order.data?.pickup?.lat}, ${order.data?.pickup?.lng}`,
            dropLocation: order.data?.drop?.address || `${order.data?.drop?.lat}, ${order.data?.drop?.lng}`,
            itemWeight: order.data?.item?.weight || "",
            price: order.data?.item?.price || "",
            timeAgo: "Just now"
          }));
          setOrders(mapped.reverse());
        })
        .catch(e => console.error("Failed to fetch nearby orders", e));
    }
  }, [online, location]);

  useEffect(() => {
    socket.on("order:notification", (order) => {
      console.log("Received order notification:", order);
      // Map backend order to frontend card structure
      const mappedOrder = {
        id: order.orderId,
        itemName: order.item?.name || "Parcel",
        itemDescription: order.item?.description || "",
        pickupLocation: order.pickup?.address || "",
        dropLocation: order.drop?.address || "",
        itemWeight: order.item?.weight || "",
        price: order.item?.price || "",
        timeAgo: "Just now"
      };
      setOrderNotification(mappedOrder);
      setOrders(prev => {
        if (prev.some(o => o.id === mappedOrder.id)) return prev;
        return [mappedOrder, ...prev];
      });
    });
    return () => {
      socket.off("order:notification");
    };
  }, []);


  const handleAcceptOrder = async () => {
    if (!orderNotification || !orderNotification.orderId) return;
    try {
      const result = await acceptOrder(orderNotification.orderId, travellerId);
      console.log("Order accepted result:", result);
      // Optionally show confirmation or update UI
    } catch (err) {
      alert("Failed to accept order: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Traveler Dashboard
              </h1>
              <TravelerStatusToggle online={online} setOnline={setOnline} />
              {orderNotification && (
                <div className="order-notification">
                  <h3>New Order Available!</h3>
                  <p>Pickup: {orderNotification.pickupLocation}</p>
                  <button onClick={handleAcceptOrder}>Accept</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <OrderList orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default TravelerDashboard;