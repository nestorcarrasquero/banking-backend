-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moneda" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "simbolo" TEXT NOT NULL,
    "codigoISO" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moneda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criptomoneda" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "simbolo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "algoritmo" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Criptomoneda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonedaToCriptomoneda" (
    "id" TEXT NOT NULL,
    "monedaId" TEXT NOT NULL,
    "criptomonedaId" TEXT NOT NULL,
    "tasaConversion" DOUBLE PRECISION NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonedaToCriptomoneda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Moneda_nombre_key" ON "Moneda"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Moneda_simbolo_key" ON "Moneda"("simbolo");

-- CreateIndex
CREATE UNIQUE INDEX "Moneda_codigoISO_key" ON "Moneda"("codigoISO");

-- CreateIndex
CREATE UNIQUE INDEX "Criptomoneda_nombre_key" ON "Criptomoneda"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Criptomoneda_simbolo_key" ON "Criptomoneda"("simbolo");

-- CreateIndex
CREATE UNIQUE INDEX "MonedaToCriptomoneda_monedaId_criptomonedaId_key" ON "MonedaToCriptomoneda"("monedaId", "criptomonedaId");

-- AddForeignKey
ALTER TABLE "MonedaToCriptomoneda" ADD CONSTRAINT "MonedaToCriptomoneda_monedaId_fkey" FOREIGN KEY ("monedaId") REFERENCES "Moneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonedaToCriptomoneda" ADD CONSTRAINT "MonedaToCriptomoneda_criptomonedaId_fkey" FOREIGN KEY ("criptomonedaId") REFERENCES "Criptomoneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
