FROM mcr.microsoft.com/dotnet/core/sdk:3.0 as dotnet-build
WORKDIR /dotnet/STS

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o out -r linux-x64

FROM mcr.microsoft.com/dotnet/core/runtime:3.0
WORKDIR /Volumes/STS
COPY --from=dotnet-build /dotnet/STS/out .
ENTRYPOINT ["dotnet", "STS.dll"]
EXPOSE 5555
