import React, { useEffect, useState } from 'react'
import Rooms from './Rooms'
import User from './User'
import {fetchRoomsDetails, fetchUserDetails} from './../utils'

export const MainPanel = () => {

    const [rooms, setRooms] = useState(null);
    const [userdata, setUserData] = useState(null);
    const [reservationTable, setReservationTable] = useState({});

    const fetchRoomsData = async () => {
        setRooms(await fetchRoomsDetails());
    }

    const fetchUsersData = async () => {
        setUserData(await fetchUserDetails());
    }


    const bookRoom = (roomIndex) => {
        const roomsData = [...rooms];
        const userCopy = { ...userdata };
        if (roomsData[roomIndex].cost > userCopy.credits) return false;
        roomsData[roomIndex].isReserved = true;
        userCopy.credits -= roomsData[roomIndex].cost;
        setRooms(roomsData);
        setUserData(userCopy);
        setReservationTable(prevBookedRooms => ({
            ...prevBookedRooms,
            [roomIndex]: roomsData[roomIndex].cost
        }));
        return true;
    }


    useEffect(() => {
        fetchRoomsData();
        fetchUsersData();
    }, [])
  return (
    <div className='w-full min-h-screen flex border-t-[4px] border-t-blue-200'>
        <Rooms rooms = {rooms} userCredits = {userdata?.credits} bookingRoom = {bookRoom}/>
        <User user = {userdata} userBookings = {reservationTable}/>
    </div>
  )
}
