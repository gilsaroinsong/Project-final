import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebase';





const Dashboard = () => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [product, setProduct] = useState([]);
    const [button, setButton] = useState("Save");
    const [ktp, setKtp] = useState("");
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect(() =>{
        firebase
        .database()
        .ref("products")
        .on("value", (res) =>{
            if (res.val()) {
                const rawData = res.val();
                const productArr = [];
                Object.keys(rawData).map((item) =>{
                    productArr.push({
                        id: item,
                        ...rawData[item],
                    });
                });
                setProduct(productArr);
            };
        });
    }, []);


    const resetForm = () => {
        setProductName("");
        setCategory("");
        setPrice("");
        setKtp("");
    };
    const onSubmit = () => {
        const data ={
            productName: productName,
            category: category,
            price: price,
            ktp: ktp,
        };
        if (button === "Save") {
            firebase.database().ref("products").push(data);
        } else {
            firebase.database().ref(`products/${selectedProduct.id}`).set(data);
        }
        resetForm();
    };

    const onUpadateData =(item) =>{
        setProductName(item.productName);
        setCategory(item.category);
        setPrice(item.price);
        setButton("Save");
        setKtp(item.ktp);
    }

    const onDeleteData = (item) =>{
        firebase.database().ref(`products/${item.id}`).remove();
    }
    
    return (
        <div className="container mt-5">
           <h1 style={{ color: 'white' }}>APLIKASI INPUT DATA KARYAWAN</h1>
            <div className="col-6">
                <p>Nama</p>
                    <input 
                    className="form-control" 
                    placeholder="type name" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)}
                    />
                    <p>Alamat</p>
                    <input 
                    className="form-control" 
                    placeholder="type alamat" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    />
                    <p>Jenis Kelamin</p>
                    <input 
                    className="form-control" 
                    placeholder="type Jenis Kelamin" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    />
                    <p>No KTP</p>
                    <input 
                    className="form-control" 
                    placeholder="type No KTP" 
                    value={ktp} 
                    onChange={(e) => setKtp(e.target.value)}
                    />
                    <br />
                    <button className="btn btn-info" onClick={onSubmit}>
                    {button}
                    </button>
                    { button === "Update" && (
                         <button className="btn btn-secondary" onClick={resetForm}>Cancel Update</button>
                    )}
            </div>
           <hr />
           <table class="table table-striped table-hover">
                <thead>
                    <th>Nama Karywan</th>
                    <th>Alamat</th>
                    <th>Jenis Kelamin</th>
                    <th>No KTP</th>
                </thead>
                <tbody>
                    {product.map((item) => (
                            <tr key={item.id}>
                                <td>{item.productName}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button 
                                    className="btn btn-warning" 
                                    onClick={() => onUpadateData(item)}>Update</button>
                                    <button className="btn btn-danger"
                                    onClick={() => onDeleteData(item)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
                </table>
        </div>
    )
}

export default Dashboard;