import { useContext } from 'react';

import authContext from '../contexts/authentication.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
