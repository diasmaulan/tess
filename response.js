const response = (statuscode, data, message, res) => {
    res.status(statuscode).json({
        payload: {
            status_code: statuscode,
            datas: data,
        },
        message: message,
       pagination: {
        previous: "",
        next: "",
        max: ""
       }
    })
}

module.exports = response