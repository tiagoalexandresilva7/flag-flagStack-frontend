function BookSuccessInfo({hotelName, booking}) {
  return (
      <section className="text-center mt-8">
          <h3>{hotelName}</h3>
          <section className="mt-8 xl:flex gap-12 place-content-center">
              <section className="mb-0 flex gap-12 place-content-center">
                  <section>
                      <p className="text-xl mb-1">Check-in:</p>
                      <p>
                          {new Date(booking.checkIn).toISOString().slice(0, 10)}
                      </p>
                  </section>
                  <section>
                      <p className="text-xl mb-1">Check-out:</p>
                      <p>
                          {new Date(booking.checkOut)
                              .toISOString()
                              .slice(0, 10)}
                      </p>
                  </section>
              </section>
              <section className="mb-0 flex gap-12 place-content-center">
                  <section>
                      <p className="mb-1">Guests:</p>
                      <p>{booking.numberOfGuests}</p>
                  </section>
                  <section>
                      <p className="mb-1">Total:</p>
                      <p>
                          <span className="font-bold">
                              {booking.pricePaid}€
                          </span>
                      </p>
                  </section>
              </section>
              <section>
                  <p className="mb-1">Status:</p>
                  <p className="font-bold">{booking.status}</p>
              </section>
              <section className="pb-0 mb-0">
                  <p className="mb-1">
                      Please wait for confirmation on your email.
                  </p>
                  <p className="pt-0 mt-0">It can take up to 24 hours.</p>
              </section>
          </section>
      </section>
  );
}

export default BookSuccessInfo