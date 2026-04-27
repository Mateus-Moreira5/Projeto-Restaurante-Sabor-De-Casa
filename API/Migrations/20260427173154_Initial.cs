using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FormulariosPedido",
                columns: table => new
                {
                    CodigoPedido = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "character varying(35)", maxLength: 35, nullable: false),
                    Telefone = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false),
                    TipoPagamento = table.Column<string>(type: "text", nullable: false),
                    TipoEntrega = table.Column<string>(type: "text", nullable: false),
                    Cep = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: true),
                    Logradouro = table.Column<string>(type: "text", nullable: true),
                    Numero = table.Column<string>(type: "text", nullable: true),
                    Bairro = table.Column<string>(type: "text", nullable: true),
                    Complemento = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormulariosPedido", x => x.CodigoPedido);
                });

            migrationBuilder.CreateTable(
                name: "Pratos",
                columns: table => new
                {
                    IdPrato = table.Column<Guid>(type: "uuid", nullable: false),
                    NomePrato = table.Column<string>(type: "character varying(35)", maxLength: 35, nullable: false),
                    Descricao = table.Column<string>(type: "text", nullable: true),
                    InfoIngredientes = table.Column<string>(type: "text", nullable: false),
                    Acompanhamentos = table.Column<string>(type: "text", nullable: false),
                    Preco = table.Column<decimal>(type: "numeric(8,2)", nullable: false),
                    Disponivel = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pratos", x => x.IdPrato);
                });

            migrationBuilder.CreateTable(
                name: "ItensPedido",
                columns: table => new
                {
                    IdPedido = table.Column<Guid>(type: "uuid", nullable: false),
                    FkCodigoPedido = table.Column<Guid>(type: "uuid", nullable: false),
                    FkIdPrato = table.Column<Guid>(type: "uuid", nullable: false),
                    Quantidade = table.Column<int>(type: "integer", nullable: false),
                    Personalizacao = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItensPedido", x => x.IdPedido);
                    table.ForeignKey(
                        name: "FK_ItensPedido_FormulariosPedido_FkCodigoPedido",
                        column: x => x.FkCodigoPedido,
                        principalTable: "FormulariosPedido",
                        principalColumn: "CodigoPedido",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItensPedido_Pratos_FkIdPrato",
                        column: x => x.FkIdPrato,
                        principalTable: "Pratos",
                        principalColumn: "IdPrato",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItensPedido_FkCodigoPedido",
                table: "ItensPedido",
                column: "FkCodigoPedido");

            migrationBuilder.CreateIndex(
                name: "IX_ItensPedido_FkIdPrato",
                table: "ItensPedido",
                column: "FkIdPrato");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItensPedido");

            migrationBuilder.DropTable(
                name: "FormulariosPedido");

            migrationBuilder.DropTable(
                name: "Pratos");
        }
    }
}
