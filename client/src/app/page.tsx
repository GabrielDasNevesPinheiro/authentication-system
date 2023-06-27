export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center">
      <div className="flex flex-col p-6 items-center space-y-8">
        <h1 className="text-4xl">Bem vindo(a)</h1>
        <div className="flex  space-x-2 text-xl">
          <button className="rounded-xl py-2 w-28 bg-red-600">Login</button>
          <button className="rounded-xl py-2 w-28 bg-red-600">Register</button>
        </div>
      </div>
    </div>
  );
}
