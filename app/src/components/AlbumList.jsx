import React, { Component } from "react";
import axios from "axios";

//set search terms
let assetRequestUrl =
  "https://api.opensea.io/api/v1/asset/0x76be3b62873462d2142405439777e971754e8e77/10161 ";
let collectionRequestUrl =
  "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&collection=parallelalpha";

class AlbumList extends Component {
  constructor() {
    super();
    this.state = {
      filteredCards: [],
    };
  }

  componentDidMount() {
    //make the request and set the component state
    axios.get(collectionRequestUrl).then((res) => {
      const cards = res.data;
      //filter out results
      // let filteredCards = albums.results.filter((album) =>
      //   album.artistName.includes("Frank Ocean")
      // );
      let filteredCards = cards.assets;
      this.setState({ filteredCards });
    });
  }

  //map through the data and populate the cards
  render() {
    return (
      <main className="w-full p-4">
        <ul className="w-full grid gap-4 gap-y-12 grid-cols-1 lg:grid-cols-3">
          {this.state.filteredCards.map((card) => (
            <li
              key={card.id}
              className="group w-full relative transform hover:-translate-y-1 transition-all h-56 hover:glow"
            >
              <div
                style={{ backgroundImage: `url(${card.image_preview_url})` }}
                className="h-full relative bg-cover bg-center rounded-lg shadow-md"
              >
                <div className="backdrop-filter backdrop-blur-lg w-full h-full rounded-lg relative flex flex-col justify-end items-center">
                  <div className="absolute inset-x-0 -top-8 flex justify-center">
                    <img
                      className=" rounded-full w-24 h-24 border-2 border-black"
                      src={card.image_thumbnail_url}
                      alt=""
                    />
                  </div>
                  <div className="bg-white w-full rounded-b-lg flex p-2 relative">
                    <div className="w-2/3">
                      <h3 className="text-2xl uppercase work line-clamp-1 font-bold">
                        {card.name}
                      </h3>
                      <h3 className="">last sale:</h3>
                      <h3 className=""></h3>
                      <h3 className="font-light">
                        {/* {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "long",
                        }).format(new Date(card.last_sale.event_timestamp))} */}
                      </h3>
                    </div>

                    <a
                      href={card.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-0 right-0 flex items-end p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      view on opensea
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default AlbumList;
