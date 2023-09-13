import React, {useEffect, useState} from "react";
import "./Layout.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import NavBar from "../../../components/NavBar/NavBar";
import AddProductContainer from "../components/addProductContainer/AddProductContainer";import { useDispatch, useSelector } from 'react-redux'
import { initializeAllProductsData } from '../../../reducers/allProductsDataReducer'
import { initializeAllBrandsData } from '../../../reducers/allBrandsDataReducer'
import { initializeAllCategoriesData } from '../../../reducers/allCategoriesReducer';

export default function Layout() {
	const dispatch = useDispatch()
	const token = useSelector(state => state.token)
	const allProductsData = useSelector(state => state.allProductsData)
	const [loading, setLoading] = useState(true)
	const [fetchData, setFetchData] = useState(true)

  useEffect(() => {
		if (fetchData) {
			dispatch(initializeAllProductsData(token))
			dispatch(initializeAllBrandsData(token))
			dispatch(initializeAllCategoriesData(token))
			setFetchData(false)
			
		}
		if (allProductsData.length > 0) {
			setLoading(false)
		}
		// eslint-disable-next-line
	}, [allProductsData, fetchData])

	if (loading) {
		return
	}
  return (
    <div className="add-product-layout">
      <NavBar className="navBar" />
      <HeaderBar className="headerBar" />
      <AddProductContainer/>
    </div>
  );
}
