import { cookies } from 'next/headers'; 
import { redirect } from 'next/navigation';
import LoginComponent from '../../../components/Login/index';

const LoginPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    redirect('/');
  }

  return <LoginComponent />;
};

export default LoginPage;
