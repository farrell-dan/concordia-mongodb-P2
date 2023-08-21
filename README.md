# Mongodb- P2

## 🦊 Pre-lecture

There is no pre-lecture for this workshop.

---

## 🦉 Lecture

- [Lecture 1 | Special Topics](./lecture/lecture-1-special-topics.md)

---


---

In today's workshop, we will be working on a ticket-buying widget, that has been created for buying specific seats at a concert (or hockey game, or airplane). Here's a GIF of the flow:

![demo flow](./lecture/assets/demo.gif)

The frontend of our "Ticket-buying widget" is fully functional. If you are curious about the frontend, then a little information for you :) The frontend has been created using the a framework called`React` ( if you want to know more about react, you can go to [reducers](https://react.dev/). 
_**BUT THE GOOD PART IS, YOU WILL BE LEARNING REACT AFTER THIS PROJECT. SO DONT WORRY IF YOU ARE NOT ABLE TO FIGURE IT OUT
FOR NOW, IT IS ONLY USED TO DISPLAY THE FRONTEND, YOU ARE NOT SUPPOSED TO WORK FOR THIS PART**_


The issue that we are dealing with is that our application is `without a database`, and our job is to integrate a database into it.

Currently, the backend is generating the seats for the theater. Let's migrate that to a database: MongoDB.

## Setup

 You'll need 2 active terminals to be able to run this project.

Add the `proxy` into the `client`'s `package.json` file:

```json
    "proxy": "http://localhost:5678"
```

### The Frontend (website):

1. Open a terminal.
2. Navigate to the `client` folder by using `cd client`.
3. Install the dependencies with `yarn install`.
4. Boot React with `yarn start:client`.
---
### The Backend (server):

1. Open a **new** terminal (you can use a split terminal if you want).
2. Navigate to the `server` folder by using `cd server`.
3. Install the dependencies with `yarn install`.
4. Boot the server with `yarn start:server`.

After following these steps, you should have 2 terminals. One should be running React, and the other should be running the server.

---

## Exercise 1 - Setup the database!

Get the seats into a database > collection. Each `seat` should be a document in the collection.

_You could use a batchImport function like the one you created yesterday..._

Keep in mind, that under normal circumstances, the FE should not be affected by any changes you make here. Meaning it shouldn't break because you change the code in the backend. Be mindful of what the FE expects as data as well as how you are storing it in the database.

Don't forget to provide an `_id` to each document. You could do that before getting rid of the code that currently generates the seats. Each seat should look something like this.

```js
{
  _id: 'A-1',
  price: 225,
  isBooked: false
}
```

## Exercise 2 - Write that function!

Once you've migrated the data, it's time to get rid of the code that is generating the seats, and write a function that queries the database to retrieve all of the seats.

Inside of `handlers.js`, there is an empty function called `getSeats` that should replace the anonymous function that is called at the `/api/seat-availability` endpoint. _Don't forget to require it._

## Exercise 3 - Booking a seat

In `handlers.js`, write a function that will handle booking the seat. It needs to update the database.

While you're at it, remove the anonymous function that is called at `/api/book-seat` and create a proper function in the `handlers.js` file.

## Exercise 4 - Who booked that?

If you verify the data that is being sent to the server when a user buys a ticket, you will notice that there is some data that we are currently not handling: `fullName` and `email`.

What should we do with that?

There are two options that come to mind:

1. Create a new collection that contains all of the user documents, along with a reference to the seat they booked.
2. Add that data to the seat document directly.

Both are viable and it really depends on what will be done with the data. It's totally up to you!

---

<center>🟢 - Complete workshop (100%) - 🟢</center>

---


