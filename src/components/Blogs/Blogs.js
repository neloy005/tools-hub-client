import React from 'react';
import codeImg from '../../images/task5.png';
import './Blogs.css'

const Blogs = () => {

    return (
        <div>
            <h2 className='login-heading'>Blogs</h2>
            <div className='question-div'>
                <div>
                    <h3>Q1: How will you improve the performance of a React Application?</h3>
                    <p>React itself is a optimized library. But there are some other ways to improve the performance more. In the production build all those developer warnings are not present. That's why it's much faster. Another thing is when a state is updated, it also updates its childs as well as parents. So we have to store the state locally if possible.By avoiding passing unnecessary props to other components can make the app faster.</p>
                </div>
                <div>
                    <h3>Q2: How does prototypical inheritance work?</h3>
                    <p>wnen a child class is extended from parent class, it gets all the properties of that parent class. This process is called inheritance. In Javascript it is called prototypical inheritance. when a property is searched in the child it searches it to its parent, if immediate parent doesn't have it it searches in its parent child and keeps on the chain. And if doesn't find it in the root parent, than it says the property is not found.</p>
                </div>
                <div>
                    <h3>Q3: Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts?</h3>
                    <p>First of all when you set the products, afterward you use setProducts, it will replace the value. Besides it also can lead to some unwanted bugs. Like updating the state of anything that should be done using useState. Simply it will create tricky to solve rerender issues.</p>
                </div>
                <div>
                    <h3>Q4: You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h3>
                    <p>I can use for of to loop through the array and then check if the given name from the user exists in the array.name using includes method.</p>
                    <img src={codeImg} alt="" />
                </div>
                <div>
                    <h3>Q5: What is a unit test? Why should write unit tests?</h3>
                    <p>nit testing is the process of testing a smaller partof the code to see if it works as expected. It can be a single line of code, a functon/method, class etc. Usit testing is required because it ensures all the code works perfectly before it goes for production. Moreover unit test saves a lot of time in the long run. The better part is it allows the developer to edit the code without affecting the functionaliy.</p>
                </div>
            </div>
        </div>
    );
};

export default Blogs;