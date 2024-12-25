import { Link } from 'react-router-dom'

const Users = ({blogs}) => {

    const names = []
    blogs.forEach(blog => {
        if(!names.includes(blog.user.name)) {
            names.push(blog.user.name)
        }
    })

    const blogCounts = []
    for(let i=0; i<names.length; i++) {
        blogCounts.push(0)
    }
    blogs.forEach(blog => {
        for(let i=0; i<names.length; i++) {
            if(blog.user.name === names[i]) {
                blogCounts[i] += 1
            }
        }
    })

    const idS = []
    blogs.forEach(blog => {
        if(!idS.includes(blog.user.id)) {
            idS.push(blog.user.id)
        }
    })

    const tableCell = []
    for(let i = 0; i < names.length; i++) {
        const userElement = {id: idS[i], name: names[i], count: blogCounts[i]}
        tableCell.push(userElement) 
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className='mb-4'>Users</h1>
        <table className='w-50'>
        <tbody>
            <tr>
                <th>name</th>
                <th>blogs created</th>
            </tr>
        {tableCell.map((cell) => (
            <tr key={cell.id}>
                <td><Link className='text-decoration-none' to={`/users/${cell.id}`}>{cell.name}</Link></td>
                <td>{cell.count}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    )
}

export default Users