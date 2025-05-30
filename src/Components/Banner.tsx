import InconRating from '../assets/rating.png'
import InconHalfRating from '../assets/rating-half.png'
import ImageTemp from '../assets/temp-1.jpeg'
import IconPlay from '../assets/play-button.png'

const Banner = () => {
  return (
    <div className="bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat h-[800px] w-full relative">
        <div className="absolute w-full h-full bg-black opacity-40 top-0 left-0"/>
        <div className="w-full h-full flex items-center justify-center space-x-[30px] p-12 relative z-20">
            <div className='flex flex-col space-y-5 items-baseline w-[50%]'>
                <p className="text-white bg-gradient-to-r from-red-600 to-red-300 text-xl py-2 px-3">TV Show</p>
                <div className="flex flex-col space-y-5">
                    <h2 className="text-white text-[40px] font-bold">Nghe nói em thích tôi</h2>
                    <div className="flex items-center space-x-3">
                        <img src={InconRating} alt="rating" className='w-8 h-8'/>
                        <img src={InconRating} alt="rating" className='w-8 h-8'/>
                        <img src={InconRating} alt="rating" className='w-8 h-8'/>
                        <img src={InconRating} alt="rating" className='w-8 h-8'/>
                        <img src={InconHalfRating} alt="half ratin" className='w-8 h-8'/>
                    </div>
                    <p className="text-white w-[50%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam commodi magnam sed quisquam voluptas omnis molestiae perferendis, voluptates veniam aliquid dignissimos sequi! Perferendis totam, accusantium ipsum nesciunt consequatur vitae enim.</p>
                    <div className='flex items-center space-x-4'>
                        <button className='text-white bg-black p-3 font-bold text-sm'>Chi tiết</button>
                        <button className='text-white bg-red-600 p-3 font-bold text-sm'>Xem phim</button>
                    </div>
                </div>
            </div>
            <div className='w-[50%] flex items-center justify-center'>
                <div className="w-[300px] h-[400px] relative group cursor-pointer">
                    <img src={ImageTemp} alt="temp" className='w-full h-full object-cover'/>
                    <div className='w-full h-full top-0 left-0 absolute flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 ease-in-out'>
                        <img src={IconPlay} alt="play" className='w-16 h-16'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner