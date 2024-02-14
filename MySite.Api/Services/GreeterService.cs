using DemoGrpc.Protobufs;
using Grpc.Core;

namespace MySite.Services;

public class GreeterService : CountryService.CountryServiceBase
{
    private readonly ILogger<GreeterService> _logger;

    public GreeterService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }

    public override async Task<CountriesReply> GetAll(EmptyRequest request, ServerCallContext context)
    {
        var countries = new List<CountryReply>();

        for (int i = 1; i <= 100; i++)
        {
            countries.Add(new CountryReply()
            {
                Id = i,
                Description = $"Test Description{i}",
                Name = $"Test Name{i}"
            });
        }
        return new CountriesReply()
        {
            Countries = {countries}
        };
    }
}