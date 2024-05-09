export default async function Help() {
  const res = await fetch(process.env.URL + '/api/getUsers', {
    cache: 'no-store',
  });
  const users = await res.json();
  console.log(users);
  return (
    <>
      <h1 className='title'>HELPP</h1>
    </>
  );
}
