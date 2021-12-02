import React, { useState, useEffect } from 'react'
import { storage, db } from '../firebase/config'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../global/AuthContext'

const AddProducts = () => {
  const [articleNumber, SetArticleNumber] = useState('')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDes, setProductDes] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  // const { currentUser } = useAuth()
  // const history = useHistory()

  // useEffect(() => {
  //   if (!currentUser) {
  //     history.push('/login')
  //   } else if (currentUser.uid !== process.env.REACT_APP_ADMIN_ID) {
  //     history.push('/')
  //   }
  // })

  const types = ['image/png', 'image/jpeg', 'image/webp']

  const productImageHandler = (e) => {
    let selectedFile = e.target.files[0]
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImage(selectedFile)
      setError('')
    } else {
      setProductImage(null)
      setError('please select only images with format png or jpeg')
    }
  }

  const addProducts = (e) => {
    e.preventDefault()
    setSuccess(false)
    console.log(productName, productImage, productPrice, productDes)
    const uploadTask = storage
      .ref(`my-images/${productImage.name}`)
      .put(productImage)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress)
      },
      (err) => setError(err.message),
      () => {
        storage
          .ref('my-images')
          .child(productImage.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('myproducts')
              .add({
                ArticleNumber: Number(articleNumber),
                ProductName: productName,
                ProductDescription: productDes,
                ProductPrice: Number(productPrice),
                ProductImage: url,
              })
              .then(() => {
                setSuccess(true)
                setProductName('')
                SetArticleNumber('')
                setProductDes('')
                setProductPrice('')
                setProductImage('')
                setError('')
                document.getElementById('file').value = ''
              })
              .catch((err) => setError(err.message))
          })
      }
    )
  }

  return (
    <div className='container'>
      <br />
      <h2 className='text-center'>Add Products</h2>
      {success && (
        <h3 className='alert-info p-2 text-center'>
          Your Product uploaded successfully!
        </h3>
      )}
      <form
        action=''
        autoComplete='off'
        className='form-group'
        onSubmit={addProducts}>
        <br />
        <label htmlFor='product-ArticleNumber'>Product Id </label>
        <input
          type='number'
          className='form-control'
          required
          onChange={(e) => SetArticleNumber(e.target.value)}
          value={articleNumber}
        />
        <br />

        <label htmlFor='product-name'>Product Name </label>
        <br />
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <label htmlFor='product-des'>Product Description </label>
        <br />
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setProductDes(e.target.value)}
          value={productDes}
        />

        <label htmlFor='product-price'>Product Price </label>
        <br />
        <input
          type='number'
          className='form-control'
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <br />
        <label htmlFor='product-img'>Product Image</label>
        <br />
        <input
          type='file'
          onChange={productImageHandler}
          id='file'
          className='form-control'
        />
        <br />
        <button className='btn btn-success btn-md btn-block myBtn'>ADD</button>
      </form>
      {error && <h2 className='alert-danger text-center p-4'>{error}</h2>}
    </div>
  )
}

export default AddProducts
