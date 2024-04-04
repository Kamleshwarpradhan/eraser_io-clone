import React from 'react'

const Hero = () => {
  return (
<section className="bg-gray-900 text-white h-screen">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:flex-col lg:gap-5">
    <div className='flex items-baseline justify-center text-center px-2 py-2'>
            <h2 className='border self-center px-2 py-2 rounded-2xl'>See what's new | <span className='text-sky-300'>AI diagrams</span></h2>
    </div>
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
       Documents & diagrams
        <span className="sm:block text-white"> for engineering teams </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border  bg-white px-12 py-3 text-sm  text-black hover:bg-transparent hover:text-white font-semibold focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="#"
        >
          Try Eraser -{'>'}
        </a>

      </div>
    </div>
  </div>
</section>
  )
}

export default Hero