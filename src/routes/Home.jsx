import React from 'react'
import supabase from '../config/supabase'

const Home = () => {
    const get = async () => {
        const { data, error } = await supabase.auth.getSession();
        console.log(data.session); // session object if logged in
    }
    get()


    return (
        <div>Home</div>
    )
}

export default Home