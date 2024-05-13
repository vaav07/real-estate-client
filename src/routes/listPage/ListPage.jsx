import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import { Suspense } from "react";

const ListPage = () => {
  const data = useLoaderData();
  // console.log(data);
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postMessage}
              errorElement={<p>Error Loading posts!</p>}
            >
              {(postMessage) =>
                postMessage.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postMessage}
            errorElement={<p>Error Loading posts!</p>}
          >
            {(postMessage) => <Map items={postMessage.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
