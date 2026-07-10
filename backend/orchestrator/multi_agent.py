import asyncio
import json
from typing import Dict, Any, List

from backend.agents.ceo import CEOAgent
from backend.agents.cto import CTOAgent
from backend.agents.pm import PMAgent
from backend.agents.marketing import MarketingAgent
from backend.agents.investor import InvestorAgent
from backend.agents.software_architect import SoftwareArchitectAgent
from backend.agents.database_architect import DatabaseArchitectAgent
from backend.agents.ui_ux import UIUXAgent
from backend.agents.legal import LegalAgent

class StartupOrchestrator:
    def __init__(self):
        self.ceo = CEOAgent()
        self.cto = CTOAgent()
        self.pm = PMAgent()
        self.cmo = MarketingAgent()
        self.investor = InvestorAgent()
        self.architect = SoftwareArchitectAgent()
        self.dba = DatabaseArchitectAgent()
        self.cdo = UIUXAgent()
        self.clo = LegalAgent()

    async def _stream_tasks(self, tasks: List[asyncio.Task]) -> Any:
        queue = asyncio.Queue()

        async def worker(stream_gen):
            async for data in stream_gen:
                await queue.put(data)
            await queue.put(None)

        workers = [asyncio.create_task(worker(t)) for t in tasks]
        
        finished_workers = 0
        total_workers = len(workers)
        
        while finished_workers < total_workers:
            data = await queue.get()
            if data is None:
                finished_workers += 1
            else:
                yield data
                
        yield f"data: {json.dumps({'status': 'DONE'})}\n\n"

    async def _stream_agent(self, agent, context: str, prompt: str, agent_id: str):
        async for chunk in agent.execute_stream(context, prompt):
            payload = json.dumps({"agent": agent_id, "chunk": chunk})
            yield f"data: {payload}\n\n"

    # --- Specific Orchestration Flows ---

    async def stream_startup_debate(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.ceo, context, f"Provide a high-level strategic evaluation for: {idea}", "ceo"),
            self._stream_agent(self.cto, context, f"Propose a scalable tech stack for: {idea}", "cto"),
            self._stream_agent(self.pm, context, f"Define the core user journey and MVP features for: {idea}", "pm"),
            self._stream_agent(self.cmo, context, f"Draft a go-to-market strategy for: {idea}", "cmo"),
            self._stream_agent(self.investor, context, f"Critique this idea from a VC perspective: {idea}", "investor"),
            self._stream_agent(self.architect, context, f"Design the system architecture for: {idea}", "architect"),
            self._stream_agent(self.dba, context, f"Design the core database schema for: {idea}", "dba"),
            self._stream_agent(self.cdo, context, f"Suggest the UI/UX design system and wireframe flows for: {idea}", "cdo"),
            self._stream_agent(self.clo, context, f"Identify legal and compliance risks for: {idea}", "clo"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    async def stream_architecture(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.cto, context, f"Provide the overarching technical strategy and cloud provider choice for: {idea}", "cto"),
            self._stream_agent(self.architect, context, f"Design the microservices or monolithic architecture boundaries for: {idea}", "architect"),
            self._stream_agent(self.dba, context, f"Draft the primary database schema and indexing strategy for: {idea}", "dba"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    async def stream_business_plan(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.ceo, context, f"Draft the executive summary and business model for: {idea}", "ceo"),
            self._stream_agent(self.pm, context, f"Draft the product roadmap and feature prioritization for: {idea}", "pm"),
            self._stream_agent(self.clo, context, f"Outline the corporate structure, vesting, and compliance requirements for: {idea}", "clo"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    async def stream_marketing(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.cmo, context, f"Design a viral Go-To-Market and user acquisition strategy for: {idea}", "cmo"),
            self._stream_agent(self.cdo, context, f"Suggest brand identity, typography, and conversion-optimized landing page structure for: {idea}", "cdo"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    async def stream_investor_review(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.investor, context, f"Conduct a harsh VC teardown of this startup idea, highlighting red flags: {idea}", "investor"),
            self._stream_agent(self.ceo, context, f"Respond to the VC's likely criticisms and defend the defensibility of: {idea}", "ceo"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    # --- New Flows ---
    
    async def stream_competitors(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.ceo, context, f"Identify top 3 direct competitors and our strategic moat against them for: {idea}", "ceo"),
            self._stream_agent(self.cmo, context, f"Analyze competitor marketing channels and where we can outmaneuver them for: {idea}", "cmo"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    async def stream_database(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.dba, context, f"Write the exact PostgreSQL / Supabase schema definitions with RLS policies for: {idea}", "dba"),
            self._stream_agent(self.cto, context, f"Explain the caching strategy (e.g. Redis) and ORM choices for this schema for: {idea}", "cto"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    async def stream_wireframes(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.cdo, context, f"Design the detailed layout and user flows for the 3 main screens of: {idea}", "cdo"),
            self._stream_agent(self.pm, context, f"Define the core user actions and conversion funnels for these wireframes: {idea}", "pm"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk

    async def stream_roadmap(self, idea: str, context: str = ""):
        tasks = [
            self._stream_agent(self.pm, context, f"Define the exact feature timeline for Q1, Q2, and Q3 for: {idea}", "pm"),
            self._stream_agent(self.cto, context, f"Define the engineering milestones and technical debt repayment schedule for: {idea}", "cto"),
        ]
        async for chunk in self._stream_tasks(tasks):
            yield chunk
