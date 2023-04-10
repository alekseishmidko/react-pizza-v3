import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();
  console.log(pizza);
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return "Loading....";
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="fullpizza" />
      <h2> {pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum enim sunt
        quis asperiores qui labore commodi, nulla illum, voluptatibus, et alias
        ullam sequi tempore unde nihil minus quia nesciunt sapiente?
      </p>
    </div>
  );
};

export default FullPizza;
// axios.get("https://63e3ba61c919fe386c0d7fe5.mockapi.io/items/" + id
