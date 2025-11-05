// component cha quan ly state va truyen props xuong cac component con
function App() {
    // state luu tu khoa tim kiem
    const [kw, setKeyword] = React.useState("");
    
    // state luu user moi duoc them tu AddUser
    // khi user moi duoc them, state nay se thay doi va kich hoat useEffect trong ResultTable
    const [newUser, setNewUser] = React.useState(null);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Quản lý Người dùng</h1>
                <p>Ứng dụng quản lý thông tin người dùng với React</p>
            </header>
            
            {/* form tim kiem - truyen callback setKeyword de cap nhat tu khoa */}
            <SearchForm onChangeValue={setKeyword} />
            
            {/* form them nguoi dung - truyen callback setNewUser de nhan user moi */}
            <AddUser onAdd={setNewUser} />
            
            {/* bang ket qua - truyen keyword de loc va user de them vao danh sach */}
            <ResultTable 
                keyword={kw} 
                user={newUser} 
                onAdded={() => setNewUser(null)} 
            />
        </div>
    );
}
