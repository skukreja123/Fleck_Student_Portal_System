import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';

import Home from './page/home';
import Studentadd from './page/studentadd';
import Teacheradd from './page/teacheradd';
import CourseAdd from './page/courseadd';


const Container = Styled.div`
  display: flex;
`;

const Main = Styled.div`
  flex: 7; 
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = Styled.div`
  padding: 10px 65px;
`;

const MenuIconWrapper = Styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
`;

function App() {
  const [darkmode, setDarkmode] = useState(true);
  const [clickin, setClick] = useState(false);

  return (
      <Container>
        <BrowserRouter>
          {/* Include Menu component outside the Routes */}
          {/** Other elements like header, sidebar, etc. can be added here */}
         

          <Main>
            {/* Routes for different pages */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/studentinsert' element={<Studentadd />} />
              <Route path='/teacherinsert' element={<Teacheradd />} />
              <Route path='/courseinsert' element={<CourseAdd />} />
              {/* Add more routes as needed */}
            </Routes>
          </Main>
        </BrowserRouter>
      </Container>

  );
}

export default App;
