-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('SUPERADMIN', 'USER_MANAGE', 'USER_CREATE', 'SUPPLIER_MANAGE', 'SUPPLIER_CREATE', 'APPROVER_L1', 'APPROVER_L2', 'APPROVER_L3', 'USER');

-- CreateEnum
CREATE TYPE "SupplierApprovalStatus" AS ENUM ('APPROVED', 'DENIED', 'PROCESSING');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ONBOARDING');

-- CreateEnum
CREATE TYPE "SupplierStatus" AS ENUM ('L1APPROVALREQUIRED', 'L1APPROVALDENIED', 'L2APPROVALREQUIRED', 'L2APPROVALDENIED', 'ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'INACTIVE',
    "roles" "UserRoles"[] DEFAULT ARRAY['USER']::"UserRoles"[],
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "primaryEmail" TEXT NOT NULL,
    "secondaryEmail" TEXT,
    "basicInformation" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "Status" "SupplierStatus" NOT NULL DEFAULT 'L1APPROVALREQUIRED',
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "primaryAddress" TEXT NOT NULL,
    "secondaryAddress" TEXT,
    "primaryPhone" TEXT NOT NULL,
    "secondaryPhone" TEXT,
    "primaryEmail" TEXT NOT NULL,
    "secondaryEmail" TEXT,
    "basicDetails" JSONB,
    "bankingDetails" JSONB NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "approverL1UserId" TEXT,
    "ApproverL1Status" "SupplierApprovalStatus",
    "approverL1Comments" TEXT,
    "approverL2UserId" TEXT,
    "ApproverL2Status" "SupplierApprovalStatus",
    "approverL2Comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_primaryEmail_key" ON "User"("primaryEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_id_key" ON "Supplier"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier"("name");

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_approverL1UserId_fkey" FOREIGN KEY ("approverL1UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_approverL2UserId_fkey" FOREIGN KEY ("approverL2UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
