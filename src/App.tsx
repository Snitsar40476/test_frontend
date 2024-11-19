import './assets/styles/index.scss';
import Header from "./components/Header/Header.tsx";
import Banner from "./components/Banner/Banner.tsx";
import CoursesContainer from "./components/Courses/CoursesContainer.tsx";
import FilesContainer from "./components/Files/FilesContainer.tsx";


const App = () => {
    return (
        <div className='wrapper'>
            <Header />
            <CoursesContainer />
            <Banner />
            <FilesContainer />
        </div>
    );
};

export default App;