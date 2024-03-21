const UnauthorizedPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '72px', marginBottom: '40px' }}>403</h1>
      <p style={{ fontSize: '24px' }}>You do not have permission to access this page.</p>
      <a href="/en/auth/login" style={{ fontSize: '20px', marginTop: '20px', display: 'inline-block', textDecoration: 'underline' }}>Go to Login Page</a>
    </div>
  );
};

export default UnauthorizedPage;
