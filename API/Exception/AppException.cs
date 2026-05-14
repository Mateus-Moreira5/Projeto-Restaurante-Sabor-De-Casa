namespace API.Exceptions;

public class AppException : Exception
{
    public int StatusCode { get;  }

    public AppException(string mensage, int statusCode = 400) : base(mensage)
    {
        StatusCode = statusCode;
    }
}