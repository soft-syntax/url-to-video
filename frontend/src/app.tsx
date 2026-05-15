import TechBadges from './components/TechBadges';

function App() {

  return (
    <>
      <TechBadges />
      <main className="max-w-3xl mx-auto gap-8 flex">
        <div className="py-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold uppercase mb-8">
            <span  className="bg-gradient-to-br from-cyan-200 to-teal-200 bg-clip-text text-transparent">Generate a video</span>
            <br />
            <span className="bg-gradient-to-br from-cyan-400 from-30% to-teal-400 bg-clip-text text-transparent">from URL WITH THE AI</span>
          </h1>

          <form action="" className="grid">

            <input className="border-2 rounded-md bg-transparent text-white px-4 py-2 mb-4 grow" type="url" placeholder="Enter URL" />
            <button className="bg-cyan-700 uppercase text-white px-4 py-2 rounded-md" type="submit">Generate Video</button>
          </form>
        </div>
        <div className="p-8">

          <div className="bg-gray-200 w-[200px] h-[380px] text-gray-500 rounded-xl p-8">Video Content</div>
        </div>
      </main>

    </>
  )
}

export default App
