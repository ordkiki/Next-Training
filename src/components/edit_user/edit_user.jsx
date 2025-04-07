import React from 'react'

function Edit() {
  return (
    <div className='w-[50vw] h-[70vh] fixed bg-white flex justify-center items-center shadow rounded-2xl'>
        <form
        //   onSubmit={handleSubmit}
          className="h-fit p-4 border w-[28vw] rounded"
        >
          <h1 className="font-bold mb-4">
            Mis a jours d'utilisateurs :
          </h1>

          <div className="mb-4">
            <input
              type="text"
              name="nom"
              className="border w-[25vw] p-2 rounded-lg"
              placeholder="nom d'utilisateur"
            //   onChange={handleChange}
            //   value={formData.nom || ""}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="adresse email"
              className="mb-4 border w-[25vw] p-2 rounded-lg"
            //   onChange={handleChange}
            //   value={formData.email || ""}
            />
          </div>
          <div className="">
            <input
              type="telephone"
              name="telephone"
              placeholder="telephone"
              className="mb-4 border w-[25vw] p-2 rounded-lg"
            //   onChange={handleChange}
            //   value={formData.telephone || ""}
            />
          </div>

          <button
            type="submit"
            className="hover:bg-blue-600 hover:text-white transition cursor-pointer w-[25vw] rounded-lg text-blue-600 p-2 border border-blue-600 text-[12px]"
          >
            Inserer
          </button>
        </form>
    </div>
  )
}

export default Edit;