import React, { useContext } from "react";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { StyledModalAddJob } from "./styles";
import { iFormSchemaModalAddJob } from "./types";
import { formSchema } from "./addJobSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../services/api";
import { authContext } from "../../contexts/authContext";
import { toast } from "react-toastify";
import { CompanyContext } from "../../contexts/CompanyContext/companyContext";

interface iCreateJob {
    userId?: number;
    job_name?: string;
    period?: string;
    work_type?: string;
    description?: string;
    requirements?: string;
    responsabilitys?: string;
    candidate?: [];
}

export const ModalAddJob = () => {
    const { setVisible } = useContext(authContext);
    const { setLoading } = useContext(CompanyContext);

    const createJob = async (data: iCreateJob) => {
        const token = localStorage.getItem("@TOKEN");
        try {
            setLoading(true);
            const response = await api.post<iCreateJob>("jobs/", data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
         
            toast.success("Vaga adicionada com sucesso");
            return response.data;
        } catch (error) {
            setLoading(false);
            toast.error("Ops! Algo deu errado.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<iFormSchemaModalAddJob>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
    });

    const onSubmitFunction: SubmitHandler<iFormSchemaModalAddJob> = async (
        data
    ) => {
        const candidates = { candidates: [] };
        const localstorageId = localStorage.getItem("@ID");
        const usersId = Number(localstorageId);
        const newData = { ...data, ...candidates, usersId };

        await createJob(newData);
        setVisible(false);
    };

    return (
        <StyledModalAddJob>
            <div className="modalAddJobContainer">
                <h3 className="modalAddJobTitle">Adicionar vaga</h3>
                <button
                    className="closeModalAddJobButton"
                    onClick={() => setVisible(false)}
                >
                    X
                </button>
                <form noValidate onSubmit={handleSubmit(onSubmitFunction)}>
                    <Input
                        label="Título"
                        type="text"
                        placeholder="Digite o título da vaga"
                        {...register("job_name")}
                    />
                    {errors.job_name && (
                        <span className="errorMessage">
                            {errors.job_name.message}
                        </span>
                    )}
                    <Input
                        label="Localização"
                        type="text"
                        placeholder="Informe a cidade/estado/país em que a vaga está disponível"
                        {...register("locality")}
                    />
                    {errors.locality && (
                        <span className="errorMessage">
                            {errors.locality.message}
                        </span>
                    )}
                    <label htmlFor="period" className="labelAddJobModal">
                        Período
                    </label>
                    <select
                        id="period"
                        className="selectAddJobModal"
                        {...register("period")}
                    >
                        <option value="" hidden>
                            Informe o período de trabalho
                        </option>
                        <option value="Integral">Integral</option>
                        <option value="Meio Período">Meio Período</option>
                    </select>
                    {errors.period && (
                        <span className="errorMessage">
                            {errors.period.message}
                        </span>
                    )}
                    <label htmlFor="work_type" className="labelAddJobModal">
                        Tipo de trabalho
                    </label>
                    <select
                        id="work_type"
                        className="selectAddJobModal"
                        {...register("work_type")}
                    >
                        <option value="" hidden>
                            Informe o tipo de trabalho
                        </option>
                        <option value="Presencial">Presencial</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Home Office">Home Office</option>
                    </select>
                    {errors.work_type && (
                        <span className="errorMessage">
                            {errors.work_type.message}
                        </span>
                    )}
                    <Textarea
                        label="Descrição"
                        placeholder="Informe a descrição da vaga"
                        id="jobDescription"
                        {...register("description")}
                    />
                    {errors.description && (
                        <span className="errorMessage">
                            {errors.description.message}
                        </span>
                    )}
                    <Textarea
                        label="Requerimentos"
                        placeholder="Liste os requerimentos para a vaga"
                        id="jobRequirements"
                        {...register("requirements")}
                    />
                    {errors.requirements && (
                        <span className="errorMessage">
                            {errors.requirements.message}
                        </span>
                    )}
                    <Textarea
                        label="Papel do desenvolvedor"
                        placeholder="Descreva as atividades que o desenvolvedor vai desempenhar"
                        id="responsabilitys"
                        {...register("responsabilitys")}
                    />
                    {errors.responsabilitys && (
                        <span className="errorMessage">
                            {errors.responsabilitys.message}
                        </span>
                    )}
                    <button
                        className="addJobButton"
                        type="submit"
                        disabled={!isDirty || !isValid}
                    >
                        Adicionar vaga
                    </button>
                </form>
            </div>
        </StyledModalAddJob>
    );
};
