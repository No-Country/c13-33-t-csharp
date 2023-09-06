import React, { useState, useEffect } from 'react'
import './InventoryContainer.css'
import searchIcon from '../../../../assets/image/searchIcon.png'
import arrowDown from '../../../../assets/image/arrowVector.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import trashIcon from '../../../../assets/image/trash.png'
import closeIcon from '../../../../assets/image/Vector.png'
import boxIcon from '../../../../assets/image/solar_box-bold.png'
import { useSelector } from 'react-redux'
import './InventoryContainerResponsive.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../../../services/deleteProduct'
import { updateProduct } from '../../../../services/updateProduct'
const { format } = require('date-fns')

export default function InventoryContainer() {
	const allProductsData = useSelector(state => state.allProductsData)
	const allBrandsData = useSelector(state => state.allBrandsData)
	const allCategoriesData = useSelector(state => state.allCategoriesData)

	const [typeFilter, setTypeFilter] = useState(null)
	const [detailShow, setDetailShow] = useState(false)
	const [isFiltered, setIsFiltered] = useState('')
	// const [animationShown, setAnimationShown] = useState(0)
	const [rotateAnimation, setRotateAnimation] = useState(180)
	const [stock, setStock] = useState()
	const [editor, setEditor] = useState(false)
	const [isAdministrator, setIsAdministrator] = useState(false)
	const [filteredProductById, setFilteredProductsById] = useState([])
	const [filteredProductByCategory, setFilteredProductsCategory] = useState([])
	const [allProducts, setAllProducts] = useState([])
	const [filterSelected, setFilterSelected] = useState('Producto')
	const [searchProduct, setSearchProduct] = useState('')
	const [categorySelect, setCategorySelect] = useState([])
	const [brandSelect, setBrandSelect] = useState([])
	const [productIdForDelete, setProductIdForDelete] = useState()
	const [editedProduct, setEditedProduct] = useState({})
	const [inputValues, setInputValues] = useState({
		id: '',
		nombre: '',
		descripcion: '',
		costo: '',
		precio: '',
		peso: '',
		alto: '',
		ancho: '',
	})
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const token = useSelector(state => state.token)

	const user = useSelector(state => state.user)

	useEffect(() => {
		if (user.roles[0].toLowerCase() === 'administrador') {
			setIsAdministrator(true)
		} else {
			setIsAdministrator(false)
		}
	}, [])

	useEffect(() => {
		if (detailShow) {
			// setAnimationShown(0)
			setRotateAnimation({ rotate: 180 }, { duration: 0.2 })
		} else {
			setRotateAnimation({ rotate: 0 })
		}
	}, [detailShow])

	useEffect(() => {
		if (filterSelected === 'Producto') {
			const productsCopyForProduct = [...allProductsData]
			const filteredByProduct = productsCopyForProduct.sort((a, b) => {
				if (a.nombre < b.nombre) {
					return -1
				}
				if (a.nombre > b.nombre) {
					return 1
				}
				return 0
			})
			setAllProducts(filteredByProduct)
		} else if (filterSelected === 'ID') {
			const productsCopyForID = [...allProductsData]
			const filteredById = productsCopyForID.sort((a, b) => a.id - b.id)
			setAllProducts(filteredById)
		} else if (filterSelected === 'Categoria') {
			const productsCopyForCategory = [...allProductsData]
			const filteredByCategory = productsCopyForCategory.sort((a, b) => {
				if (a.categoria < b.categoria) {
					return -1
				}
				if (a.categoria > b.categoria) {
					return 1
				}
				return 0
			})
			setAllProducts(filteredByCategory)
		}
	}, [filterSelected])

	const selectCategory = category => {
		setCategorySelect(category)
	}

	const selectBrand = brand => {
		setBrandSelect(brand)
	}

	const updateProductHandler = product => {
		console.log(product)
		const newDate = new Date()
		const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

		const newProduct = {
			...product,
			cantidad: newQuantity,
			updatedAt: formattedDate,
		}

		console.log(newProduct)
		setEditedProduct(newProduct)
		console.log(editedProduct)
	}

	// const sendUpdateProduct = () => {
	// 	dispatch(updateProduct({ id: editedProduct.id, ...editedProduct }))
	// }

	const [buttonPlus, setButtonPlus] = useState(0)
	const [newQuantity, setNewQuantity] = useState(0)

	const increaseProductQuantity = productId => {
		setButtonPlus(buttonPlus + 1)
		setNewQuantity(() => {
			const productToUpdate = allProducts.filter(p => p.id === productId)
			console.log(buttonPlus)
			return productToUpdate[0].cantidad + buttonPlus
		})
		// setAllProducts(prevProducts =>
		// 	prevProducts.map(product => {
		// 		if (product.id === productId) {
		// 			// Incrementa la cantidad del producto en 1
		// 			return { ...product, cantidad: product.cantidad + 1 }
		// 		}
		// 		return product
		// 	})
		// )
	}

	const decreaseProductQuantity = productId => {
		setAllProducts(prevProducts =>
			prevProducts.map(product => {
				if (product.id === productId) {
					// Decrementa la cantidad del producto en 1
					return { ...product, cantidad: product.cantidad - 1 }
				}
				return product
			})
		)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setInputValues({
			...inputValues,
			[name]: value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('id', editedProduct.id)
		formData.append('nombre', editedProduct.nombre)
		formData.append('descripcion', editedProduct.descripcion)
		formData.append('costo', editedProduct.costo)
		formData.append('precio', editedProduct.precio)
		formData.append('peso', editedProduct.peso)
		formData.append('alto', editedProduct.alto)
		formData.append('ancho', editedProduct.ancho)
		dispatch(updateProduct(formData, token))
		console.log(formData)
		navigate('/inventory')
	}

	return (
		<>
			<div className="inventory-title-search-container pb-3">
				<h3>Inventario</h3>
				{isAdministrator ? (
					<button
						onClick={() => navigate('/add-product')}
						type="button"
						className="btn btn-outline-dark rounded-pill addProduct-button"
					>
						Añadir Producto
					</button>
				) : (
					<></>
				)}
				<form className="d-flex searchbox" role="search">
					<div className="searchIconBox">
						<img
							className="searchIcon"
							src={searchIcon}
							alt="Search Icon"
						></img>
					</div>
					<input
						className="form-control rounded-pill icon-placeholder me-2"
						type="search"
						placeholder="Busca un producto"
						aria-label="Search"
						onChange={e => setSearchProduct(e.target.value)}
					/>
				</form>
			</div>
			<div className="inventory-table-container">
				<div className="title-filter-container">
					<h4>Productos</h4>
					<div className="filter">
						<p className="filter-title mt-2 mx-3">Ordenar por:</p>
						<div className="dropdown">
							<button
								className="btn btn-filter btn-outline-dark"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{filterSelected}
								<img
									className="dropdown-arrow"
									src={arrowDown}
									alt="arrow down"
								/>
							</button>
							<ul className="dropdown-menu">
								<li>
									<button
										className="button-reset  w-50"
										onClick={() => setFilterSelected('ID')}
									>
										Por ID
									</button>
								</li>
								<li>
									<button
										className="button-reset mx-2 w-75"
										onClick={() => setFilterSelected('Categoria')}
									>
										Por Categorias
									</button>
								</li>
								<li>
									<button
										className="button-reset mx-2 w-75"
										onClick={() => setFilterSelected('Producto')}
									>
										Por Producto
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="table-container">
					<table className="inventory-table table-format">
						<thead className="table-title">
							<tr className="sticky-top">
								<th className="hidden-mobile" scope="col">
									Foto
								</th>
								<th scope="col">Producto</th>
								<th className="hidden-mobile" scope="col">
									Marca
								</th>
								<th className="hidden-mobile" scope="col">
									ID
								</th>
								<th className="hidden-mobile" scope="col">
									Categoria
								</th>
								<th id="precio" scope="col">
									Precio
								</th>
								<th scope="col">Vendidos</th>
								<th id="stock" scope="col">
									Stock
								</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{allProducts
								.filter(products =>
									products.nombre
										.toLowerCase()
										.slice(0, searchProduct.length)
										.includes(searchProduct.toLocaleLowerCase())
								)
								.map((product, i) => (
									<>
										<br />
										<tr
											key={product.id}
											className={`accordion-toggle collapsed pt-5`}
											onClick={() => setDetailShow(!detailShow)}
											id="accordion1"
											data-bs-toggle="collapse"
											data-bs-parent="#accordion1"
											href={`#collapse${i}`}
											aria-controls={`collapse${i}`}
										>
											<td>
												<img
													src={product.imagen}
													alt="Product Icon"
													className="product-icon"
												/>
											</td>
											<td className="mobile-name">{product.nombre}</td>
											<td className="hidden-mobile">{product.marca}</td>
											<td className="hidden-mobile">{product.id}</td>
											<td className="hidden-mobile">{product.categoria}</td>
											<td>${product.precio}</td>
											<td>{product.cantidad}</td>
											<td>{product.cantidad}</td>
											<td>
												<motion.div animate={rotateAnimation}>
													<img
														className="detailArrow"
														src={arrowDown}
														alt="down arrow"
													/>
												</motion.div>
											</td>
										</tr>
										<tr className="hide-table-padding ">
											<td className="product-details-mobile" colSpan="9">
												<div
													id={`collapse${i}`}
													className="collapse in p-3 product-details"
												>
													<div className="product-image-container">
														<img
															className="product-img"
															src={product.imagen}
															alt="productimage"
														/>
														{editor ? (
															<button
																onClick={() => {
																	setEditor(false)
																	updateProductHandler(product)
																}}
																type="button"
																data-bs-toggle="modal"
																data-bs-target="#saveModal"
																className="btn btn-yellow product-detail-button rounded-pill"
															>
																Guardar
															</button>
														) : (
															<button
																onClick={() => {
																	setEditor(true)
																}}
																type="button"
																className="btn btn-dark product-detail-button rounded-pill"
															>
																Editar
															</button>
														)}
														{editor && isAdministrator ? (
															<button
																type="button"
																className="btn btn-delete mx-auto rounded-pill"
																data-bs-toggle="modal"
																data-bs-target="#deleteModal"
																onClick={() =>
																	setProductIdForDelete(product.id)
																}
															>
																Eliminar
															</button>
														) : (
															<></>
														)}
													</div>
													<div className="product-name-container">
														<p className="product-detail-title">Producto</p>
														{editor ? (
															<input
																name="nombre"
																className="editable-input"
																placeholder={product.nombre}
																onChange={handleInputChange}
															/>
														) : (
															<p className="product-detail-information">
																{product.nombre}
															</p>
														)}
													</div>
													<div className="product-measurements-container">
														<p className="product-detail-title">
															Ancho x Alto (cm)
														</p>
														<p className="product-detail-information">
															{product.ancho} x {product.alto}
														</p>
													</div>
													<div className="product-ros-container">
														<p className="product-detail-title">
															Margen de ganancia
														</p>
														{editor && isAdministrator ? (
															<input
																name="Margen Ganancia"
																className="addProduct-editable-input-yellow rounded-pill"
																placeholder="20%"
															/>
														) : (
															<p className="product-detail-information ros-information rounded-pill text-center">
																20%
															</p>
														)}
													</div>
													<div className="product-description-container">
														<p className="product-detail-title">Descripcion</p>
														{editor && isAdministrator ? (
															<input
																name="descripcion"
																className="editable-input"
																placeholder={product.descripcion}
																onChange={handleInputChange}
															/>
														) : (
															<p className="product-detail-information">
																{product.descripcion}
															</p>
														)}
													</div>
													<div className="product-brand-container">
														<p className="product-detail-title">Marca</p>
														{editor && isAdministrator ? (
															<div className="dropdown">
																<button
																	className="button-reset btn-filter btn-outline-dark"
																	type="button"
																	data-bs-toggle="dropdown"
																	aria-expanded="false"
																>
																	{brandSelect
																		? brandSelect.nombre
																		: product.marca}
																	<img
																		className="dropdown-arrow"
																		src={arrowDown}
																		alt="arrow down"
																	/>
																</button>
																<ul className="dropdown-menu">
																	{allBrandsData.map((brand, i) => (
																		<li key={allBrandsData.id}>
																			<button
																				value={brand}
																				className="dropdown-item  z-index-3 bg-white"
																				onClick={e => selectBrand(brand)}
																			>
																				{brand.nombre}
																			</button>
																		</li>
																	))}
																</ul>
															</div>
														) : (
															<p className="product-detail-information">
																{product.marca}
															</p>
														)}
													</div>
													<div className="product-weight-container">
														<p className="product-detail-title">Peso</p>
														{editor ? (
															<input
																name="peso"
																className="editable-input"
																placeholder={product.peso}
																onChange={handleInputChange}
															/>
														) : (
															<p className="product-detail-information">
																{product.peso}
															</p>
														)}
													</div>
													<div className="product-cost-container">
														<p className="product-detail-title">Costo</p>
														{editor && isAdministrator ? (
															<input
																name="costo"
																className="editable-input"
																placeholder={`$${product.costo}`}
																onChange={handleInputChange}
															/>
														) : (
															<p className="product-detail-information">
																${product.costo}
															</p>
														)}
													</div>
													<div className="product-id-container">
														<p className="product-detail-title">ID</p>
														<p className="product-detail-information">
															{product.id}
														</p>
													</div>
													<div className="product-sold-container">
														<p className="product-detail-title">Vendidos</p>
														<p className="product-detail-information">9</p>
													</div>
													<div className="product-price-container">
														<p className="product-detail-title">Precio</p>
														{editor && isAdministrator ? (
															<input
																name="precio"
																className="editable-input"
																placeholder={`$${product.precio}`}
																onChange={handleInputChange}
															/>
														) : (
															<p className="product-detail-information">
																${product.precio}
															</p>
														)}
													</div>
													<div className="product-category-container">
														<p className="product-detail-title ">
															Categoria &gt; subcategoria
														</p>
														<div className="product-detail-information">
															{editor ? (
																<div className="dropdown">
																	<button
																		className="button-reset btn-filter btn-outline-dark"
																		type="button"
																		data-bs-toggle="dropdown"
																		aria-expanded="false"
																	>
																		{categorySelect
																			? categorySelect.categoria
																			: product.categoria}
																		<img
																			className="dropdown-arrow"
																			src={arrowDown}
																			alt="arrow down"
																		/>
																	</button>
																	<ul className="dropdown-menu ">
																		{allCategoriesData.map((category, i) => (
																			<li key={allCategoriesData.id}>
																				<button
																					value={category}
																					className="dropdown-item z-index-3 bg-white"
																					onClick={e =>
																						selectCategory(category)
																					}
																				>
																					{category.categoria}
																				</button>
																			</li>
																		))}
																	</ul>
																</div>
															) : (
																<p>{product.categoria}</p>
															)}
														</div>
													</div>
													<div className="product-stock-container">
														<div className="product-stock">
															<p className="product-detail-title mt-3">
																Stock actual
															</p>
															<p className="product-detail-information">
																{product.cantidad}
															</p>
															{editor && isAdministrator ? (
																<div className="stock-box">
																	<button
																		type="button"
																		className="btn btn-outline-dark button-stock-minus"
																		onClick={() =>
																			decreaseProductQuantity(product.id)
																		}
																	>
																		<p className="button-sign my-3">-</p>
																	</button>
																	<p className="product-detail-information stock-number">
																		{product.cantidad + buttonPlus}
																	</p>
																	<button
																		type="button"
																		className="btn btn-outline-dark button-stock-plus"
																		onClick={() =>
																			increaseProductQuantity(product.id)
																		}
																	>
																		<p className="button-sign my-3">+</p>
																	</button>
																</div>
															) : (
																<></>
															)}
														</div>
														<div className="product-modification">
															<p className="product-detail-title">
																Ultima modificacion
															</p>
															<p>
																{new Date(product.updatedAt).toLocaleDateString(
																	'es-ar',
																	{
																		weekday: 'long',
																		year: 'numeric',
																		month: 'short',
																		day: 'numeric',
																	}
																)}
															</p>
															<p className="product-detail-information">
																{product.usuarioUltimaModificacion}
															</p>
														</div>
													</div>
												</div>
											</td>
										</tr>
									</>
								))}
						</tbody>
					</table>
				</div>
			</div>

			{/* modal window delete */}
			<div
				className="modal fade"
				id="deleteModal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="btn-close-modal rounded-circle"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<img className="closeimg" src={closeIcon} alt="" />
							</button>
						</div>
						<div className="modal-body">
							<img
								className="trash-icon mb-3"
								src={trashIcon}
								alt="Borrar Producto"
							/>
							<h1 className="modal-delete-title text-center">
								Eliminar Producto
							</h1>
							<p className="text-center text-modal">
								¿Esta seguro que desea eliminar el producto del inventario?
							</p>
						</div>
						<div className="text-center modal-button-box">
							<button
								type="button"
								className="btn btn-dark"
								data-bs-dismiss="modal"
								onClick={() =>
									dispatch(deleteProduct(productIdForDelete, token))
								}
							>
								Si, eliminar producto
							</button>
							<button
								type="button"
								className="btn btn-outline-dark mt-3 mb-3"
								data-bs-dismiss="modal"
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* modal window delete */}

			{/* modal window save */}
			<div
				className="modal fade"
				id="saveModal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="btn-close-modal rounded-circle"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<img className="closeimg" src={closeIcon} alt="" />
							</button>
						</div>
						<div className="modal-body">
							<img className="trash-icon" src={boxIcon} alt="Borrar Producto" />
							<h1 className="modal-delete-title text-center">
								Haz modificado este producto
							</h1>
							{stock !== 0 ? (
								<p className="text-center text-modal">
									La cantidad disponible para este producto ha sido actualizada
									a 30 productos en stock
								</p>
							) : (
								<></>
							)}
							<p className="text-center text-modal">
								¿Desea confirmar el cambio en {'product.nombre'}?
							</p>
						</div>
						<div className="text-center modal-button-box">
							<button
								type="button"
								className="btn btn-dark"
								data-bs-dismiss="modal"
								onClick={e => handleSubmit(e)}
							>
								Si, confirmo
							</button>
							<button
								type="button"
								className="btn btn-outline-dark mt-3 mb-3"
								data-bs-dismiss="modal"
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* modal window save */}
		</>
	)
}
