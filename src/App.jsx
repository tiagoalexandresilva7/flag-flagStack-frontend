import { Route, Switch } from 'wouter';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import HomepageView from './views/HomepageView';
import HotelView from './views/HotelView';
import BookView from './views/BookView';
import BookSuccessView from './views/BookSuccessView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import SearchHotelsView from './views/SearchHotelsView';
import ReViewS from './views/ReViewS';
import ProfileView from './views/ProfileView';

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" component={HomepageView} />
                <Route path="/hotel/:id">
                    {(params) => <HotelView hotelId={params.id} />}
                </Route>
                <Route path="/book/:hotelId">
                    {(params) => <BookView hotelId={params.hotelId} />}
                </Route>
                <Route path="/book/success/:bookingId">
                    {(params) => (
                        <BookSuccessView bookingId={params.bookingId} />
                    )}
                </Route>
                <Route path="/login" component={LoginView} />
                <Route path="/signup" component={SignupView} />
                <Route path="/search" component={SearchHotelsView} />
                <Route path="/reviews" component={ReViewS} />
                <Route path="/myProfile" component={ProfileView} />
            </Switch>
            <Footer />
        </>
    );
}

export default App;
