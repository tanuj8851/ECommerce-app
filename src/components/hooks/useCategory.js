import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();

  //get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.token) getCategories();
    // getCategories();
  }, []);

  return categories;
}
