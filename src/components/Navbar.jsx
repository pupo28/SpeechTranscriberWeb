import '../App.css'
import { CountriesSelect } from './CountriesSelect.jsx';

function Navbar() {

    return (
        <header className='flex items-center justify-between gap-4 p-4'>
            <a href="/"><h1 className='font-semibold'>Speech<span className='text-green-400 bold'>Transcriber</span></h1></a>
            <div className='gap-4 flex items-center '>
                <CountriesSelect/>
                <a href="/" className='flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-green-400'>
                    <p>New</p>
                    <i className="fa-solid fa-plus"></i>
                </a>
            </div>
        </header>
    )
}

export default Navbar;
