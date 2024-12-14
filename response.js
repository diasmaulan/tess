const response = (statusCode, data, message, res) => {
    // Pastikan statusCode adalah integer valid
    if (!statusCode || !Number.isInteger(statusCode)) {
      statusCode = 500; // Default to internal server error if statusCode is invalid
    }
  
    // Format Response
    res.status(statusCode).json({
      payload: {
        status_code: statusCode,
        datas: data, // Data bisa berupa array atau objek, pastikan sesuai dengan API yang diinginkan
      },
      message: message || "Request processed successfully", // Jika message kosong, beri default message
      pagination: {
        previous: null, // Set ke null atau string kosong jika tidak ada data sebelumnya
        next: null, // Set ke null atau string kosong jika tidak ada data selanjutnya
        max: null // Atur ke nilai yang sesuai jika ada batasan pagination
      }
    });
  }
  
  module.exports = response;
  