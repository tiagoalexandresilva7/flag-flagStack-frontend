function BookHeading({hotelName}) {
  return (
      <hgroup className="text-center">
          <h1>Booking on {hotelName}</h1>
          <p>Please fill in the form!</p>
      </hgroup>
  );
}

export default BookHeading