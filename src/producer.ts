import express from 'express'

export default function producer() {
    function reply (req, res){
        res.send('Hello Producer!');
    }
}