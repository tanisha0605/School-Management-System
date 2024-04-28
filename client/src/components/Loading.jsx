import { CircularProgress } from '@mui/material';

function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Make the container fill the entire viewport height
    }}>
      <CircularProgress />
    </div>
  );
}

export default Loading;