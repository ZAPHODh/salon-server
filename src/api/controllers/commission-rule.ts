import { prisma } from "../../../lib/prisma";
import { asyncHandler } from "../../helper";
import { CreateCommissionRuleBody } from "../../interfaces";

export const commissionRulesController = {
  createCommissionRule: asyncHandler(async (req, res) => {
    const body:CreateCommissionRuleBody = req.body;
    const commissionRule = await prisma.commissionRule.create({
      data: body
    });
    res.status(201).json(commissionRule);
  }),

  getCommissionRule: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const commissionRule = await prisma.commissionRule.findUnique({
      where: { id },
    });
    res.json(commissionRule);
  }),

  updateCommissionRule: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const updatedCommissionRule = await prisma.commissionRule.update({
      where: { id },
      data: body
    });
    res.json(updatedCommissionRule);
  }),

  deleteCommissionRule: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.commissionRule.delete({ where: { id } });
    res.status(204).send();
  }),

  listCommissionRules: asyncHandler(async (req, res) => {
    // Adicione filtros conforme necessário (ex: salonId)
    const commissionRules = await prisma.commissionRule.findMany();
    res.json(commissionRules);
  })
};