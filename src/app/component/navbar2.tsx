import ProjectLogo from 'next/image'


function Navbar(){
    return (
        <div>
            <header className="">
                <div className="flex items-center space-x-2 ml-5">
                    <ProjectLogo src="/logo CEHRSR.png" width={50} height={60} alt="project-logo" />
                    <h1 className="text-3xl"><a href="index.html">CEHRSR</a></h1>
                </div>

                

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><a href="#">Login / Registration</a></button>
            </header>
        </div>
    );
}

export default Navbar;




  
  