//controlo los resultados y estados de la peticion, devulevo el response con resultados
function getSuspender(promise) {
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );

    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }
    };

    return { read };
}

//envio por POST titulo, descripcion, terminada e id_usuario
/*  devuelve:
        $data = [
            'status' => 'Tarea creada!',
            'nueva_tarea' => [
                'id',
                'titulo',
                'descripcion',
                'terminada',
                'fechaCreacion',
                'user',
            ]
        ]; 
*/
export function fetchCreateTarea(newTarea) {
    //para prod
    //let url = "https://todo-api-symfony-47610e1130ec.herokuapp.com/api/tarea";
    let url = "http://127.0.0.1:8000/api/tarea";

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(newTarea),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => { return data; });
}

//envio id de la tarea y la tarea que se va a modificar por method PUT
export function fetchUpdateTarea(id, updateTarea) {
    //para prod
    //let url = "https://todo-api-symfony-47610e1130ec.herokuapp.com/api/tarea/" + id;
    let url = "http://127.0.0.1:8000/api/tarea/" + id;

    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(updateTarea),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => { return data; });
}

//envio id tarea a eliminar con method DELETE
export function fetchDeleteTarea(id) {
    //para prod
    //let url = "https://todo-api-symfony-47610e1130ec.herokuapp.com/api/tarea/" + id;
    let url = "http://127.0.0.1:8000/api/tarea/" + id;
    
    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => { return data; });
}


//obtengo una lista de tareas de un id_usuario
/*  devuelve:
        $data[] = [
            'id',
            'titulo',
            'descripcion',
            'terminada',
            'fechaCreacion',
            'user',
        ];
*/
export function fetchGetTareas(id_user) {
    //para prod
    //let url = "https://todo-api-symfony-47610e1130ec.herokuapp.com/api/tareas/" + id_user;
    let url = "http://127.0.0.1:8000/api/tareas/" + id_user;

    const promise = fetch(url,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => data);

    return getSuspender(promise); //uso getSuspender para mostrar spinner al inicio
}

//obtengo una sola tarea por id_tarea
export function fetchGetTarea(url) {
    //TODO:falta desarrollar fetchGetTarea
    const promise = fetch(url)
        .then((response) => response.json())
        .then((data) => data);

    return getSuspender(promise);
}

//envio por POST mail y password, espero un tkn en la response
export function fetchLogin(url, mail, password) {
    //TODO:falta desarrollar fetchLogin
    const promise = fetch(url)
        .then((response) => response.json())
        .then((data) => data);

    return getSuspender(promise);
}