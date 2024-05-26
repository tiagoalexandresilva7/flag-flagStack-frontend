import { Link } from "wouter";

function HotelGoToButton({hotelId}) {
  return (
      <Link to={`/hotel/${hotelId}`}>
          <button>Go to Hotel</button>
      </Link>
  );
}

export default HotelGoToButton