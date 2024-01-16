import Main  from './body'

export default function Form(){
    return(
        <main>
            <div className="text-4xl text-center font-bold pt-20">
                <h1>Login Here</h1>
                <p className="text-green-500 dark:text-green-400"></p>
                <hr className="w-48 h-1 mx-auto my-4 bg-green-100 border-0 rounded md:my-10 dark:bg-green-700" />
                <p className="text-green-500 dark:text-green-400"></p>
            </div>
            <Main />
        </main>
    )
}