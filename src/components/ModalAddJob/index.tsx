import React, { useContext } from "react";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { StyledModalAddJob } from "./styles";
import { IFormSchemaModalAddJob } from "./types";
import { formSchema } from "./addJobSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { createJob } from "../../services/createJob";
import { authContext } from "../../contexts/authContext";

export const ModalAddJob = () => {
    const { setVisible, setLoadingInModal } = useContext(authContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<IFormSchemaModalAddJob>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
    });

    const onSubmitFunction: SubmitHandler<IFormSchemaModalAddJob> = async (
        data
    ) => {
        const candidates = { candidates: [] };
        const localstorageId = localStorage.getItem("@ID");
        const usersId = Number(localstorageId);
        const newData = { ...data, ...candidates, usersId };

        setLoadingInModal(true);
        createJob(newData);
        setVisible(false);
        setLoadingInModal(false);
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
                        id="responsabilities"
                        {...register("responsabilities")}
                    />
                    {errors.responsabilities && (
                        <span className="errorMessage">
                            {errors.responsabilities.message}
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
