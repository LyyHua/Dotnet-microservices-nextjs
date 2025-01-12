using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionCreatedConsumer(IMapper mapper) : IConsumer<AuctionCreated>
{
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("--> Consuming auction created: " + context.Message.Id);

        var item = mapper.Map<Item>(context.Message);

        //Example for handling fault queue in RabbitMQ
        if (item.Model == "Foo") throw new ArgumentException("Cannot sell cars with name Foo");

        await item.SaveAsync();
    }
}
