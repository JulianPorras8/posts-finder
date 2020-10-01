// health check URL
function Ping() {
  return (
    <div>OK</div>
  );
}

// This gets called on every request
/* istanbul ignore next */
export async function getServerSideProps(context) {
  context.res.end('OK');
  return { props: {} }
}

export default Ping;
