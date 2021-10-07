import React from "react";
import { act, render, screen } from "@testing-library/react";
import App from "../App";
require("cross-fetch/polyfill");

const mockAlbums = [
  {
    userId: 3,
    id: 21,
    title: "repudiandae voluptatem optio est consequatur rem in temporibus et",
  },
  {
    userId: 3,
    id: 22,
    title: "et rem non provident vel ut",
  },
  {
    userId: 3,
    id: 23,
    title: "incidunt quisquam hic adipisci sequi",
  },
  {
    userId: 3,
    id: 24,
    title: "dolores ut et facere placeat",
  },
  {
    userId: 3,
    id: 25,
    title: "vero maxime id possimus sunt neque et consequatur",
  },
  {
    userId: 3,
    id: 26,
    title: "quibusdam saepe ipsa vel harum",
  },
  {
    userId: 3,
    id: 27,
    title: "id non nostrum expedita",
  },
  {
    userId: 3,
    id: 28,
    title: "omnis neque exercitationem sed dolor atque maxime aut cum",
  },
  {
    userId: 3,
    id: 29,
    title: "inventore ut quasi magnam itaque est fugit",
  },
  {
    userId: 3,
    id: 30,
    title: "tempora assumenda et similique odit distinctio error",
  },
];
const mockPhotos = [
  {
    albumId: 21,
    id: 1001,
    title: "photoTitle velit corrupti odio suscipit rerum",
    url: "https://via.placeholder.com/600/a91759",
    thumbnailUrl: "https://via.placeholder.com/150/a91759",
  },
  {
    albumId: 21,
    id: 1002,
    title: "photoTitle eveniet expedita est est amet doloremque facilis velit at",
    url: "https://via.placeholder.com/600/a8d0f4",
    thumbnailUrl: "https://via.placeholder.com/150/a8d0f4",
  },
  {
    albumId: 21,
    id: 1003,
    title: "accusantium photoTitle qui aperiam ipsum ipsam vel dolores alias",
    url: "https://via.placeholder.com/600/71cb63",
    thumbnailUrl: "https://via.placeholder.com/150/71cb63",
  },
  {
    albumId: 21,
    id: 1004,
    title: "possimus et photoTitle et sint non est culpa",
    url: "https://via.placeholder.com/600/99ba7f",
    thumbnailUrl: "https://via.placeholder.com/150/99ba7f",
  },
  {
    albumId: 21,
    id: 1005,
    title: "photoTitle a aliquam quia",
    url: "https://via.placeholder.com/600/7496a",
    thumbnailUrl: "https://via.placeholder.com/150/7496a",
  },
  {
    albumId: 21,
    id: 1006,
    title: "qui corporis quia photoTitle",
    url: "https://via.placeholder.com/600/753f7e",
    thumbnailUrl: "https://via.placeholder.com/150/753f7e",
  },
  {
    albumId: 21,
    id: 1007,
    title: "photoTitle at alias qui quis accusamus",
    url: "https://via.placeholder.com/600/896576",
    thumbnailUrl: "https://via.placeholder.com/150/896576",
  },
  {
    albumId: 21,
    id: 1008,
    title: "eius velit eligendi vitae photoTitle suscipit quia voluptas",
    url: "https://via.placeholder.com/600/d0d07f",
    thumbnailUrl: "https://via.placeholder.com/150/d0d07f",
  },
  {
    albumId: 21,
    id: 1009,
    title: "blanditiis neque photoTitle quaerat sit omnis sit facere",
    url: "https://via.placeholder.com/600/1d20b6",
    thumbnailUrl: "https://via.placeholder.com/150/1d20b6",
  },
  {
    albumId: 21,
    id: 1010,
    title: "voluptates fugiat doloremque photoTitle voluptatum quia",
    url: "https://via.placeholder.com/600/dda153",
    thumbnailUrl: "https://via.placeholder.com/150/dda153",
  },
  {
    albumId: 21,
    id: 1011,
    title: "et dicta saepe ratione photoTitle corrupti odit est et ipsam",
    url: "https://via.placeholder.com/600/c62a55",
    thumbnailUrl: "https://via.placeholder.com/150/c62a55",
  },
  {
    albumId: 21,
    id: 1012,
    title: "quos in ut photoTitle  quia",
    url: "https://via.placeholder.com/600/69751a",
    thumbnailUrl: "https://via.placeholder.com/150/69751a",
  },
  {
    albumId: 21,
    id: 1013,
    title: "natus photoTitle qui doloribus",
    url: "https://via.placeholder.com/600/e90af4",
    thumbnailUrl: "https://via.placeholder.com/150/e90af4",
  },
  {
    albumId: 21,
    id: 1014,
    title: "modi photoTitle rem quasi",
    url: "https://via.placeholder.com/600/bc4536",
    thumbnailUrl: "https://via.placeholder.com/150/bc4536",
  },
  {
    albumId: 21,
    id: 1015,
    title: "quia photoTitle pariatur et",
    url: "https://via.placeholder.com/600/b29092",
    thumbnailUrl: "https://via.placeholder.com/150/b29092",
  },
  {
    albumId: 21,
    id: 1016,
    title: "maiores photoTitle ipsam est",
    url: "https://via.placeholder.com/600/ea1813",
    thumbnailUrl: "https://via.placeholder.com/150/ea1813",
  },
  {
    albumId: 21,
    id: 1017,
    title: "et enim modi photoTitle aut officia sunt sint",
    url: "https://via.placeholder.com/600/8a8674",
    thumbnailUrl: "https://via.placeholder.com/150/8a8674",
  },
  {
    albumId: 21,
    id: 1018,
    title: "velit voluptates photoTitle iste architecto non incidunt illo",
    url: "https://via.placeholder.com/600/155e0f",
    thumbnailUrl: "https://via.placeholder.com/150/155e0f",
  },
  {
    albumId: 21,
    id: 1019,
    title: "exercitationem photoTitle voluptates suscipit et",
    url: "https://via.placeholder.com/600/6374c9",
    thumbnailUrl: "https://via.placeholder.com/150/6374c9",
  },
  {
    albumId: 21,
    id: 1020,
    title: "eos quis velit photoTitle dolores et est fugiat",
    url: "https://via.placeholder.com/600/b3bc11",
    thumbnailUrl: "https://via.placeholder.com/150/b3bc11",
  },
  {
    albumId: 21,
    id: 1021,
    title: "unde similique illo photoTitle ducimus voluptatum laborum",
    url: "https://via.placeholder.com/600/80d120",
    thumbnailUrl: "https://via.placeholder.com/150/80d120",
  },
  {
    albumId: 21,
    id: 1022,
    title:
      "suscipit soluta qui photoTitle sapiente sit reprehenderit perferendis omnis facilis",
    url: "https://via.placeholder.com/600/7ec9f5",
    thumbnailUrl: "https://via.placeholder.com/150/7ec9f5",
  },
  {
    albumId: 21,
    id: 1023,
    title: "et nesciunt qui et",
    url: "https://via.placeholder.com/600/63afda",
    thumbnailUrl: "https://via.placeholder.com/150/63afda",
  },
  {
    albumId: 21,
    id: 1024,
    title:
      "dolorem praesentium photoTitle voluptas alias quia commodi illum provident porro",
    url: "https://via.placeholder.com/600/9e8734",
    thumbnailUrl: "https://via.placeholder.com/150/9e8734",
  },
  {
    albumId: 21,
    id: 1025,
    title: "fugiat quidem photoTitle commodi et quia",
    url: "https://via.placeholder.com/600/609463",
    thumbnailUrl: "https://via.placeholder.com/150/609463",
  },
  {
    albumId: 21,
    id: 1026,
    title: "et itaque sit photoTitle dicta mollitia molestiae omnis quibusdam",
    url: "https://via.placeholder.com/600/796735",
    thumbnailUrl: "https://via.placeholder.com/150/796735",
  },
  {
    albumId: 21,
    id: 1027,
    title: "sint voluptatem photoTitle reprehenderit error saepe laudantium",
    url: "https://via.placeholder.com/600/8c5f6e",
    thumbnailUrl: "https://via.placeholder.com/150/8c5f6e",
  },
  {
    albumId: 21,
    id: 1028,
    title: "est fugit photoTitle voluptas qui eveniet earum",
    url: "https://via.placeholder.com/600/8342b3",
    thumbnailUrl: "https://via.placeholder.com/150/8342b3",
  },
  {
    albumId: 21,
    id: 1029,
    title: "dolores photoTitle animi ducimus et voluptatem",
    url: "https://via.placeholder.com/600/97164f",
    thumbnailUrl: "https://via.placeholder.com/150/97164f",
  },
  {
    albumId: 21,
    id: 1030,
    title: "dolor photoTitle libero debitis",
    url: "https://via.placeholder.com/600/64d874",
    thumbnailUrl: "https://via.placeholder.com/150/64d874",
  },
];
describe("Album Photos", () => {
  afterEach(() => jest.resetAllMocks());

  it("displays 10 photos for first album when the first album is clicked", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockImplementation((url) => {
      return Promise.resolve({
        json: () => {
          if (url.endsWith("userId=1")) {
            return Promise.resolve(mockAlbums);
          }

          if (url.endsWith("photos")) {
            return Promise.resolve(mockPhotos);
          }

          return Promise.resolve([]);
        },
      });
    });
    await act(async () => {
      render(<App />);
    });

    const firstAlbum = await screen.findByText(
      /repudiandae voluptatem optio est consequatur rem in temporibus et/i
    );

    await act(async () => {
      firstAlbum.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const firstPhoto = await screen.findByText(
      /velit corrupti odio suscipit rerum/i
    );
    expect(firstPhoto).toBeDefined();
    expect(mockFetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/albums/21/photos"
    );
        
    const photos = await screen.findAllByAltText(/photoTitle/)
    expect(photos.length).toBeLessThanOrEqual(10);
  });
});
