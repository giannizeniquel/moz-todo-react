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
export function fetchCreateTarea(newTarea) {
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

//obtengo una lista de tareas de un id_usuario
export function fetchGetTareas(id_user) {
    let url = "http://127.0.0.1:8000/api/tareas/" + id_user;

    const promise = fetch(url,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => data);

    return getSuspender(promise);
}

//obtengo una sola tarea por id_tarea
export function fetchGetTarea(url) {
    const promise = fetch(url)
        .then((response) => response.json())
        .then((data) => data);

    return getSuspender(promise);
}

//envio por POST mail y password, espero un tkn en la response
export function fetchLogin(url, mail, password) {
    const promise = fetch(url)
        .then((response) => response.json())
        .then((data) => data);

    return getSuspender(promise);
}