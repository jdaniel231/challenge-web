import { useEffect, useState } from "react";
import Button from "../elements/Button"
import Datepicker from "react-tailwindcss-datepicker";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "../components/QuillToolbar";
import challengeApi from "../api/challenges";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const initialErrorState = {
  title: ' ',
  description: ' ',
  date: ' ',
  api: ' '
}

const AddChallenge = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [errors, setErrors] = useState(initialErrorState);
  const [cookies, setCookie] = useCookies([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.jwt) {
      navigate('/');
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErros = {
      title: ' ',
      description: ' ',
      date: ' ',
      api: ' ',
    }

    if (title.length === 0) {
      newErros.title = "Title is required";
    }
    if (description.length === 0 || description === '<p><br></p>') {
      newErros.description = "Description is required";
    }

    if (value.startDate === null || value.endDate === null) {
      newErros.date = "Date is required";
    }

    setErrors(newErros);

    const hasErros = Object.values(newErros).some(erro => erro !== ' ');
    if (hasErros) {
      return;
    }

    newChallenge();
  }

  const newChallenge = async () => {
    const [response, error] = await challengeApi.addChallenge(cookies.jwt, {
      challenge: {
        title: title,
        description: description,
        start_date: value.startDate.toISOString(),
        end_date: value.endDate.toISOString(),
      }
    });
    handleResponse([response, error]);
  }

  const handleResponse = async ([data, error]) => {
    if (error) {
      setErrors({
        ...errors,
        api: error || "Erro ao adicionar o desafio"
      });
      alert(`Erro: ${error}`);
      console.log(error);
    } else {
      // JWT não deve estar no JSON, apenas no cabeçalho da resposta, então remove esse trecho
      // Se o JWT for necessário, ajuste conforme a resposta real da sua API
  
      // Verifica o status diretamente, não a partir do JSON
      if (data && data.id) { // Assume que o JSON contém um 'id' se a criação for bem-sucedida
        alert("Challenge added successfully!"); // Exibe o alerta
        navigate('/'); // Redireciona para a página inicial após o alerta
      } else {
        alert("Erro ao adicionar o desafio"); // Exibe erro caso o status não seja o esperado
      }
    }
  };
  
  

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold">
        Add Challenge
      </h3>

      <form action="" className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <div className="border border-gray-300 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="mt-1 block w-full px-3 py-2 rounded-md border-transparent bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-shadow"
                placeholder="Title"
              />
            </div>
            {errors.title && errors.title !== ' ' && <p className='text-red-500 text-sm text-medium mt-1'>{errors.title}</p>}
          </div>


          <div className="text-editor">
            <QuillToolbar />
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              placeholder="Write your description here"
            />
            {errors.description && errors.description !== ' ' && <p className='text-red-500 text-sm text-medium mt-1'>{errors.description}</p>}
          </div>
          <div className="border border-gray-300 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
            <Datepicker
              placeholder="Select date"
              minDate={new Date()}
              value={value}
              displayFormat="DD/MM/YYYY"
              onChange={(newValue) => setValue(newValue)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        {errors.date && errors.date !== ' ' && <p className='text-red-500 text-sm text-medium mt-1'>{errors.date}</p>}
        <div className="mt-4">
          <Button>
            Add
          </Button>

          {errors.api && errors.api !== ' ' && <p className='text-red-500 text-sm text-medium mt-1'>{errors.api}</p>}
        </div>
      </form>
    </div>
  )
}

export default AddChallenge